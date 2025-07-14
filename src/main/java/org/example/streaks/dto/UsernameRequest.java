package org.example.streaks.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;


import java.util.List;


@Getter
@AllArgsConstructor
public class UsernameRequest {
    private List<String> usernames;

}
