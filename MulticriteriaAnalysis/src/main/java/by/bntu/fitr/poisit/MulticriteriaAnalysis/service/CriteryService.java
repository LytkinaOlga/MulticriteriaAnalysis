package by.bntu.fitr.poisit.MulticriteriaAnalysis.service;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import org.springframework.stereotype.Service;

@Service
public class CriteryService {

    public Critery[] criteries;

    public CriteryService() {
    }

    public Critery[] createArrayOfCriteries(int size){
        this.criteries = new Critery[size];
        return this.criteries;
    }


}
