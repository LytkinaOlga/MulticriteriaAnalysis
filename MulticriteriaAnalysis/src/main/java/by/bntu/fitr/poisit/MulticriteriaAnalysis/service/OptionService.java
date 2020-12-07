package by.bntu.fitr.poisit.MulticriteriaAnalysis.service;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Option;
import org.springframework.stereotype.Service;

@Service
public class OptionService {
    public Option[] options;

    public OptionService() {
    }

    public Option[] createArrayOfOptions(int size){
        this.options = new Option[size];
        return this.options;
    }
}
