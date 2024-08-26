package com.config.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CustomerException extends RuntimeException{

    public CustomerException(String message){
        super(message);
    }
}
