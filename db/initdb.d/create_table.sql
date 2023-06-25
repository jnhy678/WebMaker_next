CREATE TABLE Users (
    `id`        INT          NOT NULL AUTO_INCREMENT,
    `name`      VARCHAR(25)  NOT NULL UNIQUE,
    `password`  VARCHAR(50)      NOT NULL,
    PRIMARY KEY (id)
);