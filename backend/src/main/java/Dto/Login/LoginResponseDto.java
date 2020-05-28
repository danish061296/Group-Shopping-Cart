package Dto.Login;

public class LoginResponseDto {
    public final boolean success;
    public final String error;

    public LoginResponseDto(boolean success, String error) {
        this.success = success;
        this.error = error;
    }
}
