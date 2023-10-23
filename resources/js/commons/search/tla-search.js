import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from 'antd'
import {FiSearch} from 'react-icons/fi'

let timeout
// let currentValue

const TlaSearch = (props) => {
  const { callback } = props
  const [loading, setLoading] = useState(false)

    const fetch = (event) => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        // currentValue = value

        function fake () {
            setLoading(true)
            callback(new URLSearchParams({ search: event.target.value })).then(() => {
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }

        timeout = setTimeout(fake, 300)
    }

  return (
      <Input onChange={fetch} prefix={<FiSearch style={{ color: 'var(--Gray-500)'}} />} size={'large'} placeholder="Search"/>
  )
}

TlaSearch.propTypes = {
  callback: PropTypes.func,
}


export default TlaSearch
