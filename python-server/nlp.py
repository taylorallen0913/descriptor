import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx


def split_text_into_sentences(paragraph):
    sentences = paragraph.split(". ")
    return text_preprocessing(sentences)


def text_preprocessing(sentences):
    clean_sentences = []
    for sentence in sentences:
        clean_sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
    clean_sentences.pop()

    return clean_sentences


def compare_sentences(sentence1, sentence2):
    stop_words = set(stopwords.words('english'))

    sentence1 = [sentence.lower() for sentence in sentence1]
    sentence2 = [sentence.lower() for sentence in sentence2]

    # Make list of all unique words
    all_unique_words = list(set(sentence1+sentence2))

    # Create vector to hold word significance
    vector1 = [0]*len(all_unique_words)
    vector2 = [0]*len(all_unique_words)

    for i in sentence1:  # each time there is a non-stop word, count its occurence
        if i in stop_words:  # skip if it is a stopword
            continue
        vector1[all_unique_words.index(i)] += 1

    for i in sentence2:
        if i in stop_words:  # skip if it is a stopword
            continue
        vector2[all_unique_words.index(i)] += 1

    # Compare difference with cosine distance function
    return 1 - cosine_distance(vector1, vector2)


def build_similarity_matrix(sentences):
    similarity_matrix = np.zeros((len(sentences), len(sentences)))

    for counter1, sentence1 in enumerate(sentences):
        for counter2, sentence2 in enumerate(sentences):
            if sentence1 == sentence2:
                continue
            similarity_matrix[counter1][counter2] = compare_sentences(
                sentence1, sentence2)

    return similarity_matrix


def generate_summary(text):
    nltk.download('stopwords')

    # Split text into tokenized sentences
    try:
        sentences = split_text_into_sentences(text)
    except:
        print("ERROR")

    # Generate similarity matrix
    similarity_matrix = build_similarity_matrix(sentences)

    # Rank the sentences
    sentence_similarity_graph = nx.from_numpy_array(similarity_matrix)
    scores = nx.pagerank(sentence_similarity_graph)

    ranked_sentence = sorted(
        ((scores[i], s) for i, s in enumerate(sentences)), reverse=True)

    summarize_text = []

    for i in range(min(4, len(sentences))):
        summarize_text.append(" ".join(ranked_sentence[i][1]))

    summary = ". ".join(summarize_text) + "."
    return summary


def format_summary(paragraph):
    # Split by sentence
    try:
        split_paragraph = paragraph.split('.')[:-1]
        formatted = ''

        # Strip whitespace from each sentence and add to formatted result
        sentence_number = 0
        for sentence in split_paragraph:
            formatted += split_paragraph[sentence_number].strip() + "\n"
            sentence_number += 1
        return formatted[:-1]
    except:
        print('HERE')
        return "ERROR"
