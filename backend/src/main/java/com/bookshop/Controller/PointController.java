package com.bookshop.Controller;

import com.bookshop.dto.MemberDto;
import com.bookshop.service.MemberService;
import com.bookshop.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//포인트 확인, 추가, 감소

@RestController
@RequestMapping("/point")
public class PointController {
    private final PointService pointService;

    @Autowired
    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @PostMapping("/check")
    public int checkPoint(@RequestBody MemberDto memberDto) {
        int result = memberDto.getPointBalance();
        return result;
    }

    @PostMapping("/add")
    public int addPoint(@RequestBody MemberDto memberDto) {
        System.out.println("변경 전 포인트: "+memberDto.getChangePoint());
        int result = pointService.addPoint(memberDto.getUserId(), memberDto.getChangePoint());
        System.out.println("변경 후 포인트: "+memberDto.getChangePoint());

        return result;
    }

    @PostMapping("/reduce")
    public int reducePoint(@RequestBody MemberDto memberDto) {
        System.out.println("변경 전 포인트: "+memberDto.getChangePoint());
        int result = pointService.reducePoint(memberDto.getUserId(), memberDto.getChangePoint());
        System.out.println("변경 후 포인트: "+memberDto.getChangePoint());

        return result;
    }



}
