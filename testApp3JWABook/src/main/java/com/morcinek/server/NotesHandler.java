package com.morcinek.server;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.morcinek.server.model.Note;

@Path("/notes")
public class NotesHandler {

	private Note note;

	public NotesHandler() {
		note = new Note("1");
		note.setName("Hello world");
		note.setContent("This is the first note");
	}

	@GET
	@Produces({ MediaType.TEXT_XML, MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
	public Note answer() {
		return note;
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String answerPlain() {
		return "Note [id=" + note.getId() + ", name=" + note.getName() + ", content=" + note.getContent() + "]";
	}
	
	@POST
	//@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Note answerHTML() {
		System.out.println("reached here");
		return note;
	}

}