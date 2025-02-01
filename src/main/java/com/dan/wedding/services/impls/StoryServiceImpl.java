package com.dan.wedding.services.impls;

import com.dan.wedding.dtos.requests.StoryRequest;
import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.Story;
import com.dan.wedding.repositories.StoryRepository;
import com.dan.wedding.services.FileUploadService;
import com.dan.wedding.services.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private FileUploadService fileUploadService;

    @Override
    public List<Story> getAll() {
        return storyRepository.findAll();
    }

    @Override
    public Story create(StoryRequest storyRequest) {
        Story story = new Story();
        story.setTitle(storyRequest.getTitle());
        story.setDate(storyRequest.getDate());
        story.setDescription(storyRequest.getDescription());
        try {
            String fileCode = fileUploadService.uploadFile(storyRequest.getFile()).getFileCode();
            story.setImage(fileCode);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return storyRepository.save(story);
    }

    @Override
    public Story update(String id, StoryRequest storyRequest) {
        return storyRepository.findById(id)
                .map(story -> {
                    story.setTitle(storyRequest.getTitle());
                    story.setDate(storyRequest.getDate());
                    story.setDescription(storyRequest.getDescription());

                    MultipartFile file = storyRequest.getFile();
                    if (file != null) {
                        try {
                            String oldFileCode = story.getImage();
                            String fileCode = fileUploadService.uploadFile(file).getFileCode();
                            story.setImage(fileCode);
                            fileUploadService.deleteFileByFileCode(oldFileCode);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }

                    return storyRepository.save(story);
                })
                .orElseThrow(() -> new RuntimeException("Không tìm thấy câu chuyện"));
    }

    @Override
    public ResponseMessage delete(String id) {
        return storyRepository.findById(id)
                .map(story -> {
                    storyRepository.delete(story);
                    return new ResponseMessage(200, "Xóa câu chuyện thành công");
                })
                .orElseThrow(() -> new RuntimeException("Không tìm thấy câu chuyện"));
    }
}
