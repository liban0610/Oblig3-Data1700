CREATE TABLE IF NOT EXISTS BILLETT (
    id        INTEGER AUTO_INCREMENT NOT NULL,
    film      VARCHAR(100)            NOT NULL,
    antall    INTEGER                NOT NULL,
    fornavn   VARCHAR(25)            NOT NULL,
    etternavn VARCHAR(25)            NOT NULL,
    tlfnr     VARCHAR(8)             NOT NULL,
    epost     VARCHAR(50)            NOT NULL,
    PRIMARY KEY (id)
    );