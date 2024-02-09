import {Types} from '../actions/batches/Types'

const initialState = {
    batches: {
        data: [],
        meta: {}
    },
    batchStudents: {
        data: [],
        meta: {}
    },
    batch: {},
    allBatches: [],
    exams: {},
    exam: {},
    reviews: [],
    examAnswers: [],
    currentExamQuestion: 0,
    filter: {
        program_id: 'all',
        staff_id: 'all',
        start_date: null,
        end_date: null
    }
}

export const addOrRemoveItem = (items, newItem, remove = false) => {
    const i = items.findIndex(itm => itm.id === newItem.id)

    if (i > -1) {
        if (remove) {
            items = items.filter((item) => item.id !== newItem.id)
        } else {
            items[i] = newItem
        }
    } else items.push(newItem)
    return items
}

export default function batchReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_BATCHES:
            return {...state, batches: action.payload}

        case Types.GET_BATCH_STUDENTS:
            return {...state, batchStudents: action.payload}

        case Types.GET_ALL_BATCHES:
            return {...state, allBatches: action.payload}

        case Types.ADD_BATCH_FILTER:
            return {...state, filter: action.payload}

        case Types.GET_BATCH:
            return {...state, batch: action.payload}

        case Types.ADD_BATCH:
            return {
                ...state,
                batches: {...state.batches, data: state.batches.data.concat(action.payload)}
            }

        case Types.GET_EXAM_QUESTIONS:
            return {
                ...state,
                exam: action.payload
            }
        case Types.UPDATE_BATCH:
            return {
                ...state,
                batch: action.payload,
                batches: {
                    ...state.batches,
                    data: state.batches.data.map((batch) => {
                        return batch.id === action.payload.id ? action.payload : batch
                    })
                }
            }

        case Types.REMOVE_BATCH:
            return {
                ...state,
                batches: {...state.batches, data: state.batches.data.filter((batch) => batch.id !== action.id)}
            }

        case Types.SWITCH_QUESTION:
            // eslint-disable-next-line no-case-declarations
            let current = 0;

            if (action.payload === 'next') {
                current = state.currentExamQuestion + 1
            } else if (action.payload === 'prev') {
                current = state.currentExamQuestion - 1
            } else {
                current = action.payload
            }
            return {
                ...state,
                currentExamQuestion: current
            }

        case Types.ANSWER_QUESTION:
            // eslint-disable-next-line no-case-declarations
            const answers = addOrRemoveItem(state.examAnswers, action.payload);
            return {
                ...state,
                examAnswers: [...answers]
            }

        case Types.ADD_TO_REVIEW:
            // eslint-disable-next-line no-case-declarations
            const reviews = addOrRemoveItem(state.reviews, action.payload, true);
            return {
                ...state,
                reviews: [...reviews]
            }

        case Types.GET_EXAMS:
            return {
                ...state,
                exams: action.payload
            }
        default:
            return state
    }
}
