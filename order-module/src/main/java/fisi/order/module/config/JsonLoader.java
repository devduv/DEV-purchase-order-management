package fisi.order.module.config;

import java.util.Map;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.core.io.support.EncodedResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.io.support.PropertySourceFactory;

public class JsonLoader implements PropertySourceFactory {

    @Override
    @SuppressWarnings("unchecked")
    public org.springframework.core.env.PropertySource<?> createPropertySource(String name,
            EncodedResource resource) {
        Map<String, Object> readValue = null;
        InputStream inputStream;
        try {
            inputStream = resource.getInputStream();
            ObjectMapper objectMapper = new ObjectMapper();
            readValue = objectMapper.readValue(inputStream, Map.class);
            return new MapPropertySource("json-source", readValue);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        
    }
}