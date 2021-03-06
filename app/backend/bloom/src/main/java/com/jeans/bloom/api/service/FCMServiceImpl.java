package com.jeans.bloom.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.jeans.bloom.api.request.FCMReq;
import com.jeans.bloom.db.entity.Alarm;
import com.jeans.bloom.db.entity.User;
import com.jeans.bloom.db.repository.AlarmRepository;
import com.jeans.bloom.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Service
@Slf4j

public class FCMServiceImpl implements FCMService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AlarmRepository alarmRepository;


    private final String API_URL = "https://fcm.googleapis.com/v1/projects/bloom-bbe17/messages:send";
    private final ObjectMapper objectMapper;
    private static final String MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
    private static final String[] SCOPES = { MESSAGING_SCOPE };

    /**
     * HHS | 2022.05.13
     * @name sendMessageTo
     * @des 회원의 토큰값과 메시지 내용을 받아 알람을 보내는 메서드
     */
    @Override
    public void sendMessageTo(String targetToken, String title, String body) throws IOException {
        String message = makeMessage(targetToken, title, body);

        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message,
                MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        Response response = client.newCall(request).execute();

        System.out.println(response.body().string());
    }

    private String makeMessage(String targetToken, String title, String body) throws JsonParseException, JsonProcessingException {
        FCMReq fcmMessage = FCMReq.builder()
                .message(FCMReq.Message.builder()
                        .token(targetToken)
                        .notification(FCMReq.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(null)
                                .build()
                        ).build()).validateOnly(false).build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase/firebase_service_key.json";

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(Arrays.asList(SCOPES));

        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }

    /**
     * HHS | 2022.05.13
     * @name sendMessage
     * @des 타입에 따른 메시지 내용을 받아 알람을 보내는 메서드
     */
    @Override
    public void sendMessage(String title, String body) throws Exception{
        List<String> userIds = userRepository.getUserToken();
        for (int i = 0; i < userIds.size(); i++) {
            User user = userRepository.findUserByUserId(userIds.get(i));
            String token = user.getPhoneToken();
            this.sendMessageTo(token, title, body);

            this.insertAlarm(user.getUserId(), body);
        }
    }

    /**
     * HHS | 2022.05.13
     * @name insertAlarm
     * @des 알람을 보낸 후 알람 테이블에 저장해주는 메소드
     */
    @Override
    public void insertAlarm(String user_id, String content) throws Exception{
        Alarm alarm = new Alarm();
        User user = userRepository.findUserByUserId(user_id);
        alarm.setUser(user);
        alarm.setContent(content);
        alarmRepository.save(alarm);
    }

}