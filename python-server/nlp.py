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
    clean_sentences.pop()  # getting rid of the empty list at the end

    return clean_sentences


def compare_sentences(sentence1, sentence2):
    stop_words = set(stopwords.words('english'))
    # make a list of all the unique words between the two sentences
    # make a vector holds how each word has a specific entity in the list
    # from the vector, use cosine_distance to find how different these vectors are

    sentence1 = [sentence.lower() for sentence in sentence1]
    sentence2 = [sentence.lower() for sentence in sentence2]

    # get a list of all unique words
    all_unique_words = list(set(sentence1+sentence2))

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

    # https://kite.com/python/docs/nltk.cluster.cosine_distance
    # cosine similarity is a mathematical term used to compute the angle between two documents where each word is on it's own dimension
    # cosine distance is 1-cosine_similarity, below we are calculating cosine similarity
    return 1 - cosine_distance(vector1, vector2)


def build_similarity_matrix(sentences):
    # go through and a build a matrix that is sentences.length by sentences.length
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
    # generate the sentences from the existing paragraph
    sentences = split_text_into_sentences(text)

    # generate a similarity matrix
    similarity_matrix = build_similarity_matrix(sentences)

    # rank the sentences in the similarity matrix
    sentence_similarity_graph = nx.from_numpy_array(similarity_matrix)
    scores = nx.pagerank(sentence_similarity_graph)

    # organize the scores from top to bottom
    ranked_sentence = sorted(
        ((scores[i], s) for i, s in enumerate(sentences)), reverse=True)

    summarize_text = []

    for i in range(min(5, len(sentences))):
        summarize_text.append(" ".join(ranked_sentence[i][1]))

    summary = ". ".join(summarize_text)+"."
    return summary


def format_summary(paragraph):
    # Split by sentence
    split_paragraph = paragraph.split('.')[:-1]

    formatted = ''

    # Strip whitespace from each sentence and add to formatted result
    sentence_number = 0
    for sentence in split_paragraph:
        formatted += "- " + split_paragraph[sentence_number].strip() + "\n"
        sentence_number += 1

    return formatted
