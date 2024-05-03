package com.example.testweb;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    private Logger logger = LoggerFactory.getLogger(BillettController.class);

    @Autowired
    private BillettRepository rep;

    private boolean validerBillett(Billett innBillett){
        String regexNavn = "[a-zA-ZæøåÆØÅ. \\-]{2,20}";
        String regexTlf = "\\+?\\d{8,}";
        String regexEpost = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
        boolean fornavnOk = innBillett.getFornavn().matches(regexNavn);
        boolean etternavnOk = innBillett.getEtternavn().matches(regexNavn);
        boolean tlfOk = innBillett.getTlfnr().matches(regexTlf);
        boolean epostOk = innBillett.getEpost().matches(regexEpost);

        if (fornavnOk && etternavnOk && tlfOk && epostOk){
         return true;
        }
        logger.error("Valideringsfeil");
        return false;
    }

    @GetMapping("/hentFilmer")
    public List<Filmer> hentFilmer(){
        List<Filmer> listFilmer = new ArrayList<>();
        listFilmer.add(new Filmer("Velg en film"));
        listFilmer.add(new Filmer("Inception"));
        listFilmer.add(new Filmer("Parasite"));
        listFilmer.add(new Filmer("Black panther"));
        listFilmer.add(new Filmer("Interstellar"));
        return listFilmer;
    }

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett, HttpServletResponse response) throws IOException {
        if (!validerBillett(innBillett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i Validering - prøv igjen senere");
        }  else
        if (!rep.lagreBillett(innBillett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB - prøv igjen senere");
        }
    }


    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){

        return rep.hentAlleBilletter();
    }

    @DeleteMapping("/slett/{id}")
    public void slettBillett(@PathVariable int id) {
        rep.slettBillett(id);
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){

        rep.slettAlleBilletter();
    }

}