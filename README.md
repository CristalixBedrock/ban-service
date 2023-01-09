## Edit database config
```
/config/db.config.js
```

## Project setup
```
npm install
```

### Run
```
node server.js or 
```

### Docs
```
/api-doc
```


### Execute a SQL-funcction to create a database
```
CREATE TABLE IF NOT EXISTS `bans` (
id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
player varchar(255) NOT NULL,
reason varchar(255),
ban_id varchar(255) NOT NULL,
banner varchar(255),
active BOOLEAN DEFAULT false,
banned_date timestamp NOT NULL,
ban_expiration timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `mutes` (
id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
player varchar(255) NOT NULL,
reason varchar(255),
ban_id varchar(255) NOT NULL,
banner varchar(255),
active BOOLEAN DEFAULT false,
banned_date timestamp NOT NULL,
ban_expiration timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

