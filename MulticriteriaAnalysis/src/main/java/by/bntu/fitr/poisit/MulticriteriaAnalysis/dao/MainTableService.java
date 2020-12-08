package by.bntu.fitr.poisit.MulticriteriaAnalysis.dao;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Option;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Data
public class MainTableService {
    public Map<String, List<Double>> map = new HashMap<>();

    @Autowired
    CriteryService criteryService;


    public Map<String, List<Double>> addInfInMap(Option option, List<Double> marks){
        this.map.put(option.getName(), marks);
        return this.map;
    }

    public double countSum(Option option){
        List<Critery> criteries = criteryService.criteries;
        double sum = 0;
        List<Double> marks = this.map.get(option.getName());
        for (int i = 0; i< criteries.size(); i ++) {
            sum += marks.get(i) * criteries.get(i).getWeight();
        }
        return sum;
    }
}
