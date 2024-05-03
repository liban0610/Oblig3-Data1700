package com.example.testweb;


public class Billett {
    private int id;
    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private String tlfnr;
    private String epost;

    public Billett(){

    }
    public Billett(int id, int antall, String fornavn, String etternavn, String tlfnr, String epost){
        this.id=id;
        this.antall=antall;
        this.fornavn=fornavn;
        this.etternavn=etternavn;
        this.tlfnr=tlfnr;
        this.epost=epost;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTlfnr() {
        return tlfnr;
    }

    public void setTlfnr(String tlfnr) {
        this.tlfnr = tlfnr;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }
}
