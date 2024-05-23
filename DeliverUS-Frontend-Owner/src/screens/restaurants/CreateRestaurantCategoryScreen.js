import * as yup from 'yup'
import { createCategory } from '../../api/RestaurantEndpoints'
import { useState, React } from 'react'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { ScrollView, View, Pressable, StyleSheet } from 'react-native'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import { Formik } from 'formik'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TextError from '../../components/TextError'

export default function CreateRestaurantCategoryScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState()

  const initialCategoryValue = { name: null }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(50, 'Category name too long')
      .required('Category name is required')
  })

  const crearCategoria = async (values) => {
    setBackendErrors([])
    console.log(values)
    console.log(values.name)
    try {
      const createdCategory = await createCategory(values)
      showMessage({
        message: `Category ${createdCategory.name} succesfully created`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('CreateRestaurantScreen')
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
      console.log(backendErrors)
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialCategoryValue}
      onSubmit={crearCategoria}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />
              {backendErrors &&
  backendErrors.map((error, index) => <TextError key={index}>{error.msg}</TextError>)
}
              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'yellow'
                      : '#95BE05'
                  },
                  styles.button
                ]}>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                <TextRegular textStyle={styles.text}>
                  Save
                </TextRegular>
              </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 20,
    margin: '1%',
    padding: 10
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
