package com.zimmem.kanban.json;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class JsonDaySerializer extends JsonSerializer<Date> {
	
	

	@Override
	public void serialize(Date date, JsonGenerator generator, SerializerProvider provider)
			throws IOException, JsonProcessingException {
		if(date == null ){
			generator.writeNull();
		}else{
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			generator.writeString(format.format(date));
		}
		
	}

}
