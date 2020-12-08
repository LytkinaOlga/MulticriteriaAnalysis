package by.bntu.fitr.poisit.MulticriteriaAnalysis.dao;

import java.util.List;

public class Result {
    static List<Double> resultList;

    public List<Double> addValueInList(double value){
        this.resultList.add(value);
        return this.resultList;
    }

//    public double findMax(List<Double> list){
//        re
//    }
}
