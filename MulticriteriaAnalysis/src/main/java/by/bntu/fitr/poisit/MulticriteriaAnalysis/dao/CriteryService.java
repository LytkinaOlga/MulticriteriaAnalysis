package by.bntu.fitr.poisit.MulticriteriaAnalysis.dao;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class CriteryService {

    public List<Critery> criteries;

    public CriteryService() {
    }



}
