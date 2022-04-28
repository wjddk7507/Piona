package com.jeans.bloom.api.controller;

import com.jeans.bloom.api.response.ReservationRes;
import com.jeans.bloom.api.service.PicnicService;
import com.jeans.bloom.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * LJA | 2022.04.28
 * @name PicnicController
 * @des 피크닉 API 사용을 위한 Controller
 */
@RestController
@RequestMapping("/api/picnic")
@Api(value = "피크닉 API", tags = {"Picnic"})
public class PicnicController {

    @Autowired
    private PicnicService picnicService;

    /**
     * LJA | 2022.04.28
     * @name findReservationsByUser_UserId
     * @api {get} /picnic?user_id=user_id
     * @des 회원 아이디를 입력받아 회원의 전체 예약리스트을 리턴해주는 메소드
     */
    @GetMapping
    @ApiOperation(value = "예약현황 조회", notes = "아이디를 통해 회원의 예약현황을 조회한다")
    public ResponseEntity<BaseResponseBody> findReservationsByUser_UserId(
            @RequestParam @ApiParam(value="아이디", required = true) String userId) {
        try{
            List<ReservationRes> reservationResList = picnicService.findReservationsByUser_UserId(userId);
            return ResponseEntity.status(200).body(BaseResponseBody.of( "success", reservationResList));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(BaseResponseBody.of( "fail", e));
        }
    }
}