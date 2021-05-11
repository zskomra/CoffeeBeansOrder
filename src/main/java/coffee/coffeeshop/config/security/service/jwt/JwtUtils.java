package coffee.coffeeshop.config.security.service.jwt;


import coffee.coffeeshop.config.security.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);


    @Value("${coffee-beans-order-app.app.jwtSecret}")
    private String jwtSecret;

    @Value("${coffee-beans-order-app.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

    }
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        }
        catch (SignatureException se) {
            logger.error("invalid jwt signature: {}" , se.getMessage());
        }
        catch (MalformedJwtException mje) {
            logger.error("Invalid jwt token: {}", mje.getMessage());
        }
        catch (ExpiredJwtException e) {
            logger.error("jwt token expierd: {}", e.getMessage());
        }
        catch (IllegalArgumentException e) {
            logger.error("jwt claims string is empty: {}", e.getMessage());
        }
        return false;
    }

}
