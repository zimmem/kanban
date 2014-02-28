package com.zimmem.kanban.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.zimmem.kanban.dataobject.Task;



public interface TaskRepository extends PagingAndSortingRepository<Task, Long>{

	@Query("select  t from Task t where t.status = 'waitting' and t.beginTime < ?1")
	List<Task> findCurrentWaitting(Date now);

	@Query("select  t from Task t where t.status = 'processing'")
	List<Task> findCurrentProcessing();

}
