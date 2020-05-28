package Dto.Login;

public class LoginDto {
    public final String username;
    public final String password;
    public final String usertype;
//    public final String userType;

    public LoginDto(String username, String password, String usertype) {
        this.username = username;
        this.password = password;
        this.usertype = usertype;
    }
}
