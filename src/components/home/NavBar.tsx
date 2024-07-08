import { View ,Text, StyleSheet,TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';
export default function NavBar() {
    return (
        <View style={styles.container}>
            <Text style={{color:"#FFFF",fontSize:18}}>Journal</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FF5987',
        padding: 16,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height: 56,
    },
    cards:{
        width: 200,
        padding: 5,
        flexDirection: 'row',
        gap: 3,
        borderRadius: 8,
        backgroundColor:'#FFFFFF'

    },
    card: {
        width: 50,
        height: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:"#FF5987",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filter: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})