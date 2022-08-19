import type { NextPage } from "next";
import Head from "next/head";
import { useRef, FunctionComponent } from "react";
import {
  createPlateUI,
  HeadingToolbar,
  // MentionCombobox,
  Plate,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createComboboxPlugin,
  createMentionPlugin,
  createIndentPlugin,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMdPlugin,
  createDeserializeCsvPlugin,
  createNormalizeTypesPlugin,
  createFontSizePlugin,
  createHorizontalRulePlugin,
  createDeserializeDocxPlugin,
  PlateEventProvider,
  AutoformatPlugin,
  ELEMENT_CODE_BLOCK,
  StyledElement,
} from "@udecode/plate";
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
  ExcalidrawElement,
} from "@udecode/plate-ui-excalidraw";
import { createJuicePlugin } from "@udecode/plate-juice";
import {
  MarkBallonToolbar,
  ToolbarButtons,
} from "../config/components/Toolbars";
import { withStyledPlaceHolders } from "../config/components/withStyledPlaceHolders";
import { withStyledDraggables } from "../config/components/withStyledDraggables";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { MENTIONABLES } from "../config/mentionables";
import { CONFIG } from "../config/config";
import { VALUES } from "../config/values/values";
import { createDragOverCursorPlugin } from "../config/plugins";
import { CursorOverlayContainer } from "../config/components/CursorOverlayContainer";
import {
  createMyPlugins,
  MyEditor,
  MyPlatePlugin,
  MyValue,
} from "../config/typescript";
import styled from "styled-components";

// Migrate to v8 - Part 1: https://www.loom.com/share/71596199ad5a47c2b58cdebab26f4642
// Migrate to v8 - Part 2: https://www.loom.com/share/d85c89220ffa4fe2b6f934a6c6530689
// Migrate to v8 - Part 3: https://www.loom.com/share/c1bf20e18d8a42f8a55f8a28ab605148

let components = createPlateUI({
  [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
  [ELEMENT_CODE_BLOCK]: StyledElement,
  // customize your components by plugin key
});
components = withStyledPlaceHolders(components);
components = withStyledDraggables(components);

const plugins = createMyPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createTodoListPlugin(),
    createHeadingPlugin(),
    createImagePlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin(CONFIG.linkPlugin),
    createListPlugin(),
    createTablePlugin(),
    createMediaEmbedPlugin(),
    createExcalidrawPlugin() as MyPlatePlugin,
    createCodeBlockPlugin(),
    createAlignPlugin(CONFIG.align),
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createHighlightPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createKbdPlugin(),
    createNodeIdPlugin(),
    createDndPlugin(),
    createDragOverCursorPlugin(),
    createIndentPlugin(CONFIG.indent),
    createAutoformatPlugin<
      AutoformatPlugin<MyValue, MyEditor>,
      MyValue,
      MyEditor
    >(CONFIG.autoformat),
    createResetNodePlugin(CONFIG.resetBlockType),
    createSoftBreakPlugin(CONFIG.softBreak),
    createExitBreakPlugin(CONFIG.exitBreak),
    createNormalizeTypesPlugin(CONFIG.forceLayout),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
    createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
    createComboboxPlugin(),
    createMentionPlugin(),
    createDeserializeMdPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeDocxPlugin(),
    createJuicePlugin() as MyPlatePlugin,
  ],
  {
    components,
  }
);

const Editor: FunctionComponent<{ storage: string; height: string }> = ({
  storage,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper height={height}>
      <Label>
        My label. My label. My label. My label. My label. My label. My label. My
        label. My label. My label. My label. My label.{" "}
      </Label>
      <DndProvider backend={HTML5Backend}>
        <PlateEventProvider>
          <HeadingToolbar>
            <ToolbarButtons />
          </HeadingToolbar>
        </PlateEventProvider>

        <PlateWrapper ref={containerRef}>
          <Plate<MyValue>
            id={storage}
            editableProps={CONFIG.editableProps}
            // initialValue={VALUES.playground}
            plugins={plugins}
            onChange={(value) => {
              console.log(value);
              if (containerRef.current) {
                containerRef.current.scrollTop =
                  containerRef.current.scrollHeight;
              }
            }}
          >
            <MarkBallonToolbar />

            <CursorOverlayContainer containerRef={containerRef} />
          </Plate>
        </PlateWrapper>
      </DndProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ height: string }>`
  padding: 24px;
  border: 2px solid var(--color-primary);
  border-radius: 16px;
  box-shadow: 3px 3px 6px var(--color-gray-600);
  width: 90%;
  height: ${(p) => p.height};
  overflow: auto;

  & > div {
    margin-bottom: -12px;
  }
`;

const Label = styled.div`
  font-family: var(--font-secondary);
  font-size: ${22 / 16}rem;
  font-weight: var(--font-weight-medium);
  line-height: 1.5rem;
  width: 75ch;
  padding-bottom: 8px;
  margin-bottom: 24px;
`;

const PlateWrapper = styled.div`
  position: relative;
  margin-top: -24px;
  padding: 24px;
`;

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainWrapper>
        <Editor storage="home" height="70vh" />
      </MainWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100%;
`;

const MainWrapper = styled.main`
  --color-primary: black;
`;

export default Home;
