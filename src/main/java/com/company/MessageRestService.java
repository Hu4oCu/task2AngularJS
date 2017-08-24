package com.company;

import com.company.Message.MessageService;
import com.company.Message.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Path("/messages")
@Produces("application/json")
public class MessageRestService {
    private MessageService service = new MessageService();
    private ObjectMapper json = new ObjectMapper();

    @GET
    public Response getAll() throws IOException {
        List<Message> result = new ArrayList<>();

        service.sort();
        result.addAll(service.getMessages());

        return Response.ok(json.writeValueAsString(result)).build();
    }

    @Path("/{id}")
    @GET
    public Response getMessageById(@PathParam("id") String id) throws IOException {
        if (service.getMessageById(id).getId().equals((long) -1)) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } else {
            return Response.ok(json.writeValueAsString(service.getMessageById(id))).build();
        }
    }

    @PUT
    @Consumes("application/x-www-form-urlencoded;charset=utf-8")
    public Response updateMessage(@FormParam("id") String id, @FormParam("ru") String ru,
                                  @FormParam("kz") String kz, @FormParam("en") String en) {

        Message message = service.getMessageById(id);

        message.setRu(ru);
        message.setKz(kz);
        message.setEn(en);

        service.updateMessage(message);

        return Response.ok().build();
    }

    @POST
    @Consumes("application/x-www-form-urlencoded;charset=utf-8")
    public Response addMessage(@FormParam("ru") String ru,
                               @FormParam("kz") String kz, @FormParam("en") String en) throws IOException {
        long id = service.getFreeId();

        Message message = new Message(id, ru, kz, en);

        service.addMessage(message);

        return Response.ok(json.writeValueAsString(message)).build();
    }

    @Path("/{id}")
    @DELETE
    public Response deleteMessage(@PathParam("id") String id) {
        service.deleteMessage(id);

        return Response.ok().build();
    }

}
