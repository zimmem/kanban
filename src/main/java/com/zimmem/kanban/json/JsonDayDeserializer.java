package com.zimmem.kanban.json;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class JsonDayDeserializer extends JsonDeserializer<Date> {

	@Override
	public Date deserialize(JsonParser parser, DeserializationContext conext)
			throws IOException, JsonProcessingException {
		String text = parser.getText();
		if(StringUtils.isBlank(text)){
			return null;
		}else{
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date date;
			try {
				date = format.parse(text);
				return date;
			} catch (ParseException e) {
				throw new RuntimeException(e);
			}
		}
	}

}
