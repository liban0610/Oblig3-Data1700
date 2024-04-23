package com.example.testweb;


<<<<<<< HEAD
=======
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
>>>>>>> cfbe0bd (oblig 3 d1700)
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

<<<<<<< HEAD
    public void lagreBillett(Billett innBillett){
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, tlfnr, epost) VALUES (?,?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(),
                innBillett.getEtternavn(), innBillett.getTlfnr(), innBillett.getEpost());
=======
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
>>>>>>> cfbe0bd (oblig 3 d1700)
    }

    public List<Billett> hentAlleBilletter(){
        String sql = "SELECT * FROM Billett ORDER BY etternavn";
<<<<<<< HEAD
        List<Billett> alleBilletter=db.query(sql,new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
=======
        try {
            List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
            return alleBilletter;
        } catch (Exception e){
            logger.error("Det er noe feil i henting av lista hentAlleBilletter(): ");
            return null;
        }
>>>>>>> cfbe0bd (oblig 3 d1700)
    }

    public void slettAlleBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
