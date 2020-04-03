package com.codesquad.team1.dust.aggregate;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DailyDustStatusJsonRepository extends CrudRepository<DailyDustStatusJson, Integer> {

    @Query("select json from daily_dust_status_json where station_name = :stationName order by id desc limit 1")
    Optional<String> findLatestDailyDustStatus(String stationName);
}
