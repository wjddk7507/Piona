package com.jeans.bloom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
@Builder
public class UserRegiPostReq {

    @ApiModelProperty(name="유저 ID")
    String user_id;
    @ApiModelProperty(name="유저 Password")
    String password;
    @ApiModelProperty(name="유저 PhoneNumber")
    String phone;
    @ApiModelProperty(name="유저 Name")
    String name;
    @ApiModelProperty(name="사업자 번호")
    String shop_number;
}
