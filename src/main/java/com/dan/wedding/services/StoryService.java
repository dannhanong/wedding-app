package com.dan.wedding.services;

import com.dan.wedding.dtos.requests.StoryRequest;
import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.Story;

import java.util.List;

public interface StoryService {
    List<Story> getAll();
    Story create(StoryRequest storyRequest);
    Story update(String id, StoryRequest storyRequest);
    ResponseMessage delete(String id);
}
