package by.bntu.fitr.poisit.MulticriteriaAnalysis.dao;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
public class CriteryService {

    public Critery[] criteries;

    public CriteryService() {
    }



}
