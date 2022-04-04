// @ts-nocheck

import { LinkButton } from '@strapi/design-system/LinkButton';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import React from 'react';

const PreviewLink = () => {
  const { allLayoutData, layout } = useCMEditViewDataManager();
  const { previewable } = allLayoutData.contentType.pluginOptions;

  console.log(PREVIEW_URL);
  console.log(layout);

  return previewable ? (
    <LinkButton
      variant="secondary"
      startIcon={<Eye />}
      href={`${PREVIEW_URL}/api/preview?slug=/`}
    >
      Preview
    </LinkButton>
  ) : null;
}

export default PreviewLink;
