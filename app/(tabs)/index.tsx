import Calendar from '@/components/home/Calendar';
import Journal from '@/components/home/Journal';
import NavBar from '@/components/home/NavBar';
import { Image, StyleSheet, Platform, Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <NavBar/>
      <ScrollView>
          {/* <Calendar/> */}
          <View style={styles.container}>
            <Journal/>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container:{
    justifyContent:'center',
    alignItems:'center',
    padding: 3,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
