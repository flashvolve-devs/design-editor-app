import React from "react"
import { styled, ThemeProvider, DarkTheme } from "baseui"
import { Theme } from "baseui/theme"
import { Button, KIND } from "baseui/button"
import Logo from "../../../../components/Icons/Logo"
import useDesignEditorContext from "../../../../hooks/useDesignEditorContext"
import { AppContext } from '../../../../contexts/AppContext';
import Play from "../../../../components/Icons/Play"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import useEditorType from "../../../../hooks/useEditorType"
import useDesignEditorScenes from "../../../../hooks/useDesignEditorScenes"
import { nanoid } from "nanoid"
import { IDesign } from "@layerhub-io/types"
import { loadTemplateFonts } from "../../../../utils/fonts"
import { loadVideoEditorAssets } from "../../../../utils/video"
import { useNavigate } from 'react-router-dom';
import saveJSON from "../../../../services/saveJSON"
import userDesigner from "../../../../services/userDesign"
// import { PERSONAL_TEMPLATES } from "../../../../../constants/my-edits"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "flex",
  padding: "0 1.25rem",
  justifyContent: "space-between",
  alignItems: "center",
}))

export default function () {
  const { setDisplayPreview, setScenes } = useDesignEditorContext()
  const { personalTemplates, setPersonalTemplates } = React.useContext(AppContext);
  const [saveIsAble, setSaveIsAble] = React.useState<boolean>(false)
  const editorType = useEditorType()
  const scenes = useDesignEditorScenes()
  const editor = useEditor()
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  async function designersUsers() {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      // @ts-ignore
      const userId = JSON.parse(userStorage).user_id
      const designers = await userDesigner.get(userId)
      const designersUserJson = []
      for (let i = 0; i < designers.response.results.length; i++) {
        designersUserJson.push(JSON.parse(designers.response.results[i].json_text))
      }

      setPersonalTemplates(designersUserJson)
    }
  }

  React.useEffect(() => {
      designersUsers()
  }, [])

  const parseGraphicJSON = async (toSave?: string) => {
    const currentDesign = editor.design.exportToJSON()
    const base64 = (await editor.renderer.render(currentDesign)) as string
    const updatedScenes = scenes.map((scn) => {

      console.log(currentDesign)

      if (scn.id === currentDesign.id) {
        return currentDesign.layers
      }
      return scn.layers
    })

    const presentationTemplate = {
      id: currentDesign.id,
      type: "GRAPHIC",
      name: currentDesign.name,
      frame: currentDesign.frame,
      layers: updatedScenes[0],
    }

    if (toSave === 'save') {
      const userStorage = localStorage.getItem('user')
      //@ts-ignore
      const userId = JSON.parse(userStorage).user_id
      const urlImage = await saveJSON(presentationTemplate, base64, userId)
      //@ts-ignore
      presentationTemplate["preview"] = urlImage
      console.log(personalTemplates)
      personalTemplates.push(presentationTemplate)
    } else makeDownload(presentationTemplate)
  }

  const parsePresentationJSON = (toSave?: string) => {
    const currentDesign = editor.design.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentDesign.id) {
        return {
          duration: 5000,
          layers: currentDesign.layers,
        }
      }
      return {
        duration: 5000,
        layers: scn.layers,
      }
    })

    const presentationTemplate = {
      id: currentDesign.id,
      type: "PRESENTATION",
      name: currentDesign.name,
      frame: currentDesign.frame,
      content: updatedScenes,
    }

    if (toSave === 'save') {

      personalTemplates.push(presentationTemplate)
    } else makeDownload(presentationTemplate)
  }

  const parseVideoJSON = () => {
    const currentDesign = editor.design.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentDesign.id) {
        return {
          duration: 5000,
          layers: currentDesign.layers,
        }
      }
      return {
        duration: 5000,
        layers: scn.layers,
      }
    })

    const videoTemplate = {
      id: currentDesign.id,
      type: "VIDEO",
      name: currentDesign.name,
      frame: currentDesign.frame,
      content: updatedScenes,
    }
    makeDownload(videoTemplate)
  }

  const makeDownload = (data: Object) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
    const a = document.createElement("a")
    a.href = dataStr
    a.download = "template.json"
    a.click()
  }

  const saveTemplate = async () => {
    if (editor) {
      if (editorType === "GRAPHIC") {
        return await parseGraphicJSON('save')
      } else if (editorType === "PRESENTATION") {
        return parsePresentationJSON('save')
      } else {
        return parseVideoJSON()
      }
    }
  }

  const makeDownloadTemplate = async () => {
    if (editor) {
      if (editorType === "GRAPHIC") {
        return await parseGraphicJSON()
      } else if (editorType === "PRESENTATION") {
        return parsePresentationJSON()
      } else {
        return parseVideoJSON()
      }
    }
  }

  const loadGraphicTemplate = async (payload: any) => {
    const scenes = []
    for (const scene of payload.content) {
      const design: IDesign = {
        name: "Awesome template",
        frame: payload.frame,
        id: nanoid(),
        layers: scene,
        metadata: {},
      }
      const loadedDesign = await loadVideoEditorAssets(design)

      const preview = (await editor.renderer.render(loadedDesign)) as string
      await loadTemplateFonts(loadedDesign)
      scenes.push({ ...loadedDesign, preview })
    }
    return scenes
  }

  const loadPresentationTemplate = async (payload: any) => {
    const scenes = []
    for (const scene of payload.content) {
      const design: IDesign = {
        name: "Awesome template",
        frame: payload.frame,
        id: nanoid(),
        layers: scene.layers,
        metadata: {},
      }
      const loadedDesign = await loadVideoEditorAssets(design)

      const preview = (await editor.renderer.render(loadedDesign)) as string
      await loadTemplateFonts(loadedDesign)
      scenes.push({ ...loadedDesign, preview })
    }
    return scenes
  }

  const loadVideoTemplate = async (payload: any) => {
    const scenes = []

    for (const scene of payload.content) {
      const design: IDesign = {
        name: "Awesome template",
        frame: payload.frame,
        id: nanoid(),
        layers: scene.layers,
        metadata: {},
      }
      const loadedDesign = await loadVideoEditorAssets(design)

      const preview = (await editor.renderer.render(loadedDesign)) as string
      await loadTemplateFonts(loadedDesign)
      scenes.push({ ...loadedDesign, preview })
    }
    return scenes
  }

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      let template
      if (data.type === "GRAPHIC") {
        template = await loadGraphicTemplate(data)
      } else if (data.type === "PRESENTATION") {
        template = await loadPresentationTemplate(data)
      } else if (data.type === "VIDEO") {
        template = await loadVideoTemplate(data)
      }
      //@ts-ignore
      setScenes(template)
    },
    [editor]
  )

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (res) => {
        const result = res.target!.result as string
        const design = JSON.parse(result)
        handleImportTemplate(design)
      }
      reader.onerror = (err) => {
        console.log(err)
      }

      reader.readAsText(file)
    }
  }

  return (
    // @ts-ignore
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>
        <Block $style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          <Button
            size="compact"
            onClick={saveTemplate}
            disabled={saveIsAble}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Save
          </Button>
          <Button
            size="compact"
            onClick={handleInputFileRefClick}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Import
          </Button>
          <Button
            size="compact"
            onClick={makeDownloadTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Export
          </Button>
          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            <Play size={24} />
          </Button>
          <Button
            size="compact"
            onClick={() => { localStorage.clear(); navigate('/', { replace: true }) }}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Logout
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  )
}
