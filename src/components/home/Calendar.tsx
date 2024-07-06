import { View,Text, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function Calendar () {
    return(
        <View style={styles.container}>
                <CalendarList
                    horizontal
                    pagingEnabled
                    calendarWidth={300}
                    theme={{
                    calendarBackground: '#FEEEF5',
                    textSectionTitleColor: '#000000',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    dayTextColor: '#000000',
                    todayTextColor: '#ffffff',
                    todayBackgroundColor: '#FF4D84',
                    arrowColor: '#FF4D84',
                    monthTextColor: '#000000',
                    indicatorColor: '#000000',
                    textDayFontFamily: 'Helvetica',
                    textMonthFontFamily: 'Helvetica',
                    textDayHeaderFontFamily: 'Helvetica',
                    textDayFontWeight: '300',
                    textMonthFontWeight: '300',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 10,
                    textMonthFontSize: 10,
                    textDayHeaderFontSize: 10,
                    }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FF5987',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15
    }
})