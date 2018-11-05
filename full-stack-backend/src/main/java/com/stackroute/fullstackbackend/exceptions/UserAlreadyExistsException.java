package com.stackroute.fullstackbackend.exceptions;

public class UserAlreadyExistsException extends Exception {
        String message;

    public UserAlreadyExistsException() {

    }

    public UserAlreadyExistsException(String message) {
        super(message);
        this.message = message;
    }
}
