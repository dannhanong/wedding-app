package com.dan.wedding.services.impls;

import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.Wish;
import com.dan.wedding.repositories.WishRepository;
import com.dan.wedding.services.WishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishServiceImpl implements WishService {
    @Autowired
    private WishRepository wishRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public Wish create(Wish wish) {
        Wish w = wishRepository.save(wish);
        simpMessagingTemplate.convertAndSend("/topic/wishes", w);
        return w;
    }

    @Override
    public ResponseMessage delete(String id) {
        return wishRepository.findById(id).map(wish -> {
            wishRepository.delete(wish);
            return new ResponseMessage(200, "Xóa lời chúc thành công");
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy lời chúc"));
    }

    @Override
    public List<Wish> getAll() {
        return wishRepository.findAll();
    }
}
