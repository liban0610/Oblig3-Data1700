package com.example.testweb;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(BillettRepository.class);


    public boolean lagreBillett(Billett innBillett) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, tlfnr, epost) VALUES (?,?,?,?,?,?)";
        try {
            db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(),
                    innBillett.getEtternavn(), innBillett.getTlfnr(), innBillett.getEpost());
            return true;
        } catch (Exception e) {
            logger.error("Feil i lagreBillett(): " + e);
            return false;
        }
    }

    public List<Billett> hentAlleBilletter(){
        String sql = "SELECT * FROM Billett ORDER BY etternavn";
        try {
            List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
            return alleBilletter;
        } catch (Exception e){
            logger.error("Det er noe feil i henting av lista hentAlleBilletter(): ");
            return null;
        }
    }

    @GetMapping
    public void slettBillett(int id) {
        String sql = "DELETE FROM Billett WHERE id=?";
        db.update(sql, id);
    }

    public void slettAlleBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
