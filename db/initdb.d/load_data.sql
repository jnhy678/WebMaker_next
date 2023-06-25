LOAD DATA INFILE './Users.csv' 
    INTO TABLE Users FIELDS TERMINATED BY ',' (`name`, `password`);