package by.bntu.fitr.poisit.MulticriteriaAnalysis.dao;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MainTableService {
    static Map<String, List<Integer>> map;

    @Autowired
    CriteryService criteryService;

    public Map<String, List<Integer>> addInfInMap(Option option, List<Integer> marks){
        this.map.put(option.getName(), marks);
        return this.map;
    }

    public double countSum(Option option){
        Critery[] criteries = criteryService.criteries;
        double sum = 0;
        List<Integer> marks = this.map.get(option.getName());
        for (int i = 0; i< criteries.length; i ++) {
            sum += marks.get(i) * criteries[i].getWeight();
        }
        return sum;
    }
}
