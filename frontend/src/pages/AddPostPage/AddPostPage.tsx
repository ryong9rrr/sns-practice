import { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router'
import { AddPhoto } from './components/AddPhoto'
import { AddPost } from './components/AddPost'
import { Confirm } from './components/Confirm'

// step을 직접 변경할때마다 해줘야 할 것...
// 1. query로 step을 바꾼다.
// 2. state를 바꾼다.
// 3. window.history.pushState 또는 window.history.replaceState로 URL을 변경한다.
// 4. setLocation, setState를 업데이트한다.

export interface FunnelStepProps {
  onPrev?: () => void
  onNext?: () => void
}

type InitialState = {
  transactionId?: string
  imageUrl?: string
  title?: string
  content?: string
}

export const AddPostPage = () => {
  const navigate = useNavigate()

  const [location, setLocation] = useState(() => {
    if (typeof window === 'undefined') {
      return { search: '' }
    }
    return { search: window.location.search }
  })

  const currentStep = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(location.search).get('step')
    }
    return null
  }, [location])

  const [state, setState] = useState<InitialState>(() => {
    if (typeof window === 'undefined') {
      return {}
    }
    return { ...window.history.state.usr }
  })

  const redirectTo사진추가 = useCallback(() => {
    const newTransactionId = uuid()
    const nextQuery = new URLSearchParams({
      step: '사진추가',
    }).toString()
    setLocation({ search: nextQuery })
    setState({
      transactionId: newTransactionId,
    })
    navigate(
      {
        pathname: '/addpost',
        search: nextQuery,
      },
      {
        state: {
          transactionId: newTransactionId,
        },
      },
    )
    //window.history.replaceState({}, '', `?${nextQuery}`)
  }, [navigate])

  const 사진추가_에서_게시물작성_으로_넘어가기 = () => {
    const imageUrl = '123' // 이런 이미지를 올렸다고 가정하고

    // 바꿔주기
    const nextQuery = new URLSearchParams({
      step: '게시물작성',
    }).toString()
    const nextState = {
      ...state,
      imageUrl,
    }
    setLocation({ search: nextQuery })
    setState(nextState)
    navigate(
      {
        pathname: '/addpost',
        search: nextQuery,
      },
      {
        state: nextState,
      },
    )
    //window.history.pushState(nextState, '', `?${nextQuery}`)
  }

  const 게시물작성_에서_사진추가_로_뒤로가기 = () => {
    // 바꿔주기
    const nextQuery = new URLSearchParams({
      step: '사진추가',
    }).toString()
    setLocation({ search: nextQuery })
    navigate({
      pathname: '/addpost',
      search: nextQuery,
    })
    //window.history.replaceState(state, '', `?${nextQuery}`)
  }

  const 게시물작성_에서_최종확인_으로_넘어가기 = () => {
    const title = '제목' // 이런 제목을 적었다고 가정하고
    const content = '내용' // 이런 내용을 적었다고 가정하고

    // 바꿔주기
    const nextQuery = new URLSearchParams({
      step: '최종확인',
    }).toString()
    const nextState = {
      ...state,
      title,
      content,
    }
    setLocation({ search: nextQuery })
    setState(nextState)
    navigate(
      {
        pathname: '/addpost',
        search: nextQuery,
      },
      {
        state: nextState,
      },
    )
    //window.history.pushState(nextState, '', `?${nextQuery}`)
  }

  const 최종확인_에서_게시물작성_으로_뒤로가기 = () => {
    // 바꿔주기
    const nextQuery = new URLSearchParams({
      step: '게시물작성',
    }).toString()
    setLocation({ search: nextQuery })
    navigate({
      pathname: '/addpost',
      search: nextQuery,
    })
    //window.history.replaceState(state, '', `?${nextQuery}`)
  }

  const on최종제출 = () => {
    window.alert('게시물이 성공적으로 작성되었습니다.')

    // TODO: 클린업이 안된다... 그냥 히스토리스테이트 말고 세션스토리지를 사용하자...
    // TODO: 그래서 모든 데이터는 세션스토리지에 저장하고, 최종제출시에만 서버로 보내자.
    // TODO: 세션스토리지에 저장된 데이터를 서버로 보내고, 세션스토리지를 비우자.
    navigate('/my')
  }

  useEffect(() => {
    const handlePopstate = (event: PopStateEvent) => {
      setLocation({ search: window.location.search })
      setState(event.state)
    }

    window.addEventListener('popstate', handlePopstate)
    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [location, state, currentStep])

  useEffect(() => {
    console.log('나의 state: ', state)
    console.log('window state: ', window.history.state)

    // guard
    // TODO: 받아놓은 트랜잭션ID가 없다면 리다이렉트
    // if...

    if (currentStep === '게시물작성' && !state.imageUrl) {
      console.log('이미지를 추가하지 않았는데 게시물 작성 퍼널로 진입하여 리다이렉트 합니다.')
      redirectTo사진추가()
      return
    }

    if (currentStep === '최종확인' && (!state.title || !state.content)) {
      console.log('제목이나 내용을 작성하지 않았는데 최종 확인 퍼널로 진입하여 리다이렉트 합니다.')
      redirectTo사진추가()
      return
    }
  }, [state, currentStep, location, redirectTo사진추가])

  if (currentStep === '사진추가') {
    return (
      <AddPhoto
        onPrev={() => {
          window.alert('뒤로가기')
        }}
        onNext={사진추가_에서_게시물작성_으로_넘어가기}
      />
    )
  }

  if (currentStep === '게시물작성') {
    return (
      <AddPost
        onPrev={게시물작성_에서_사진추가_로_뒤로가기}
        onNext={게시물작성_에서_최종확인_으로_넘어가기}
      />
    )
  }

  if (currentStep === '최종확인') {
    return <Confirm onPrev={최종확인_에서_게시물작성_으로_뒤로가기} onNext={on최종제출} />
  }

  return null
}
