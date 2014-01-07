package com.matt.spring.TestApp2.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

	@RequestMapping(value="/index" , method = RequestMethod.GET)
	public String testIndex(HttpServletResponse response) throws IOException{
		return "index.html";
	}
}
