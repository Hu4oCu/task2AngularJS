package com.company.Message;

public class Message implements Comparable<Message> {
    private Long id;
    private String ru;
    private String kz;
    private String en;

    public Message() {}

    public Message(long id, String ru, String kz, String en) {
        this.id = id;
        this.ru = ru;
        this.kz = kz;
        this.en = en;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRu() {
        return ru;
    }

    public void setRu(String ru) {
        this.ru = ru;
    }

    public String getKz() {
        return kz;
    }

    public void setKz(String kz) {
        this.kz = kz;
    }

    public String getEn() {
        return en;
    }

    public void setEn(String en) {
        this.en = en;
    }

    @Override
    public int compareTo(Message o) {
        return id.compareTo(o.getId());
    }
}
