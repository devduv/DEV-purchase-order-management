package fisi.order.module.config;

import java.util.LinkedHashMap;

import javax.sql.DataSource;

import org.springframework.core.env.Environment;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import fisi.order.module.security.Config;
import fisi.order.module.security.DatabaseSource;

@Configuration
@PropertySource(value = Config.CONFIGURATION, factory = JsonLoader.class)
public class AppConfig extends WebMvcConfigurationSupport {

    @Autowired
    private Environment env;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
    }

    @Bean
    public LinkedHashMap<Object, Object> getProperty() {
        JSONObject json = env.getProperty(Config.CONFIG, JSONObject.class);
        @SuppressWarnings("unchecked")
        LinkedHashMap<Object, Object> database = (LinkedHashMap<Object, Object>) json.get(Config.DATABASE);
        return database;
    }

    @Bean
    public DataSource getDataSource() {
        DatabaseSource dataSource = DatabaseSource.setProperties(getProperty());
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName(dataSource.getDriver()).url(dataSource.getUrl())
                .username(dataSource.getUsername()).password(dataSource.getPassword());
        return dataSourceBuilder.build();
    }

    @Bean("jdbcTemplate")
    JdbcTemplate JdbcTemplate(DataSource centralDataSource) {
        return new JdbcTemplate(centralDataSource);
    }
}
