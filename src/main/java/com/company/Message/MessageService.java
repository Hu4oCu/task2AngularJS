package com.company.Message;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MessageService {
    private final static String FILE_NAME = "D:/new-messages.txt";
    private static List<Message> messages = new ArrayList<>();
    private final Message notFound = new Message(-1, "NOT FOUND", "NOT FOUND", "NOT FOUND");

    static {
        try {
            InputStreamReader inputFile = new InputStreamReader(new FileInputStream(FILE_NAME), "UTF-8");
            BufferedReader reader = new BufferedReader(inputFile);
            String st;

            while ((st = reader.readLine()) != null) {
                long id;
                String ru, kz ,en;

                if (!st.equalsIgnoreCase(""))  {
                    id = Long.parseLong(st.split("\\|")[0]);
                    ru = st.split("\\|")[1];
                    kz = st.split("\\|")[2];
                    en = st.split("\\|")[3];

                    messages.add(new Message(id, ru, kz, en));
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void sort() {
        List<Message> temp = messages.stream().sorted().collect(Collectors.toList());

        messages.clear();

        messages.addAll(temp);
    }

    public Message getMessageById(String id) {
        int index = -1;

        for (int i = 0; i < messages.size(); i++) {
            if (messages.get(i).getId().equals(Long.parseLong(id))) {
                index = i;
            }
        }

        if (index >= 0) {
            return messages.get(index);
        } else {
            return notFound;
        }
    }

    public void updateMessage(Message message) {
        messages
                .stream()
                .filter(msg -> msg.getId().equals(message.getId()))
                .forEach(message1 -> {
                    message1.setRu(message.getRu());
                    message1.setKz(message.getKz());
                    message1.setEn(message.getEn());
                });
    }

    public void addMessage(Message message) {
        messages.add(message);
        sort();
    }

    public void deleteMessage(String messageId) {
        messages.remove(getMessageById(messageId));
        sort();
    }

    public long getFreeId() {
        long id = 0, dif, previousId, nextId;

        if (messages.get(0).getId() == 1) {
            for (int index = 0; index < messages.size(); index++) {
                int nextIndex;

                previousId = messages.get(index).getId();
                nextIndex = index + 1;

                if (nextIndex < messages.size()) {
                    nextId = messages.get(nextIndex).getId();
                    dif = nextId - previousId;

                    if (dif > 1) {
                        id = messages.get(index).getId() + 1;
                        break;
                    }
                } else {
                    id = messages.get(index).getId() + 1;
                }
            }
        } else {
            id = 1;
        }

        return id;
    }

}
