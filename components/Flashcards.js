import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import * as Speech from "expo-speech";

const Flashcards = ({
  userLanguage,
  currentCategory,
  dictionaries,
  learnLanguages,
  currentLearnLanguage,
  onCurrentLearnLanguageChange,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const UNSORTED_CATEGORIES = ["calendar", "pronouns", "numbers"];
  const speak = (text, userLanguage) => {
    if (!isButtonDisabled) {
      Speech.speak(text, {
        language: userLanguage,
      });

      setIsButtonDisabled(true);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 600);
    }
  };

  const sort = (obj) => {
    if (UNSORTED_CATEGORIES.includes(currentCategory)) {
      return obj;
    }

    const arr = Object.entries(obj);
    arr.sort((a, b) => a[1].localeCompare(b[1]));
    return arr.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  };

  const handleCurrentLearnLanguage = (language) => {
    onCurrentLearnLanguageChange(language);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        {dictionaries[currentLearnLanguage].categories[currentCategory].name}
      </Text>

      <ScrollView>
        {learnLanguages.length > 1 && (
          <View style={styles.languagesHeaderBox}>
            {learnLanguages.includes("pt") && (
              <TouchableOpacity
                style={styles.languageHeader}
                onPress={() => handleCurrentLearnLanguage("pt")}
              >
                <Text
                  style={
                    currentLearnLanguage === "pt"
                      ? styles.languageHeaderText
                      : styles.languageHeaderTextDisabled
                  }
                >
                  {dictionaries[userLanguage].languages.pt}
                </Text>
              </TouchableOpacity>
            )}

            {learnLanguages.includes("en") && (
              <TouchableOpacity
                style={styles.languageHeader}
                onPress={() => handleCurrentLearnLanguage("en")}
              >
                <Text
                  style={
                    currentLearnLanguage === "en"
                      ? styles.languageHeaderText
                      : styles.languageHeaderTextDisabled
                  }
                >
                  {dictionaries[userLanguage].languages.en}
                </Text>
              </TouchableOpacity>
            )}

            {learnLanguages.includes("es") && (
              <TouchableOpacity
                style={styles.languageHeader}
                onPress={() => handleCurrentLearnLanguage("es")}
              >
                <Text
                  style={
                    currentLearnLanguage === "es"
                      ? styles.languageHeaderText
                      : styles.languageHeaderTextDisabled
                  }
                >
                  {dictionaries[userLanguage].languages.es}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {currentLearnLanguage && (
          <View style={styles.words}>
            {Object.keys(sort(dictionaries[userLanguage][currentCategory])).map(
              (key) => (
                <View style={styles.row} key={key}>
                  <Text style={styles.word}>
                    {dictionaries[userLanguage][currentCategory][key]}
                  </Text>

                  {currentLearnLanguage === "pt" && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        speak(dictionaries.pt[currentCategory][key], "pt-BR")
                      }
                    >
                      <Text style={styles.buttonText}>
                        {dictionaries.pt[currentCategory][key]}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {currentLearnLanguage === "en" && (
                    <TouchableOpacity
                      style={styles.button}
                      disabled={isButtonDisabled}
                      onPress={() =>
                        speak(dictionaries.en[currentCategory][key], "en-US")
                      }
                    >
                      <Text style={styles.buttonText}>
                        {dictionaries.en[currentCategory][key]}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {currentLearnLanguage === "es" && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        speak(dictionaries.es[currentCategory][key], "es-ES")
                      }
                    >
                      <Text style={styles.buttonText}>
                        {dictionaries.es[currentCategory][key]}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    color: "#fefefe",
    marginTop: 40,
    paddingBottom: 10,
  },
  languagesHeaderBox: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  languageHeader: {
    paddingLeft: 10,
  },
  languageHeaderText: {
    fontSize: 16,
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  languageHeaderTextDisabled: {
    fontSize: 16,
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    opacity: 0.2,
  },
  words: {
    marginVertical: 10,
  },
  row: {
    backgroundColor: "#ececec",
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  word: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 2,
    fontSize: 15,
    color: "#555555",
  },
  button: {
    flexGrow: 1,
    flex: 1,
    padding: 10,
    backgroundColor: "#0f6f89",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Flashcards;
