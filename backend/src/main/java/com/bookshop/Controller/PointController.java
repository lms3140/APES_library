package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.MemberService;
import com.bookshop.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/point")
public class PointController {
    private final PointService pointService;

    @Autowired
    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @PostMapping("/add")
    public int addPoint(@RequestBody MemberDto memberDto) {
        int result = pointService.addPoint(memberDto.getUserId(), memberDto.getChangePoint());

        return result;
    }

    @PostMapping("/reduce")
    public int reducePoint(@RequestBody MemberDto memberDto) {
        int result = pointService.reducePoint(memberDto.getUserId(), memberDto.getChangePoint());

        return result;
    }



}
