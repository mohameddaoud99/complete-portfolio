package com.portfolio.media.service;

import com.portfolio.common.exception.BadRequestException;
import com.portfolio.config.SupabaseStorageProperties;
import java.io.IOException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SupabaseStorageService {

    private final RestClient restClient;
    private final SupabaseStorageProperties props;

    public SupabaseStorageService(SupabaseStorageProperties props) {
        this.props = props;
        this.restClient = RestClient.builder()
                .baseUrl(props.serviceUrl())
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + props.serviceKey())
                .build();
    }

    public void upload(MultipartFile file, String storedFileName) {
        byte[] bytes;
        try {
            bytes = file.getBytes();
        } catch (IOException e) {
            throw new BadRequestException("Failed to read uploaded file: " + e.getMessage());
        }

        ByteArrayResource resource = new ByteArrayResource(bytes) {
            @Override
            public String getFilename() {
                return storedFileName;
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", resource);

        restClient.post()
                .uri("/object/{bucket}/{fileName}", props.bucket(), storedFileName)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header("x-upsert", "true")
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }

    public void delete(String storedFileName) {
        restClient.delete()
                .uri("/object/{bucket}/{fileName}", props.bucket(), storedFileName)
                .retrieve()
                .toBodilessEntity();
    }

    public String publicUrl(String storedFileName) {
        return props.serviceUrl() + "/object/public/" + props.bucket() + "/" + storedFileName;
    }
}
