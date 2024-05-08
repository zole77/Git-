package com.mycom.ussum.controller;

import com.mycom.ussum.service.CommentService;
import com.mycom.ussum.vo.CommentVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@Tag(name = "댓글 API", description = "댓글 API입니다.")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/create")
    @Operation(summary = "댓글 생성")
    public void addComment(@RequestBody CommentVO comment){
        commentService.createComment(comment);
    }

    @GetMapping("/get/{post_no}")
    @Operation(summary = "댓글 조회")
    public List<CommentVO> getComments(@PathVariable("post_no") int post_no){
        return commentService.getComments(post_no);
    }

    @PostMapping("/delete")
    @Operation(summary = "댓글 삭제", description = "comment 테이블의 use 칼럼값을 N으로 수정합니다.")
    public void deleteComment(@RequestParam("post_no") String post_no, @RequestParam("com_no") String com_no){
        commentService.deleteComment(post_no, com_no);
    }
}
